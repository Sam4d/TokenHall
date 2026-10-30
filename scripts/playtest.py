"""Browser smoke test. Requires Python playwright and Chromium (see README)."""
import json, os
from pathlib import Path
from playwright.sync_api import sync_playwright
BASE = os.environ.get('TOKENHALL_URL', 'http://127.0.0.1:4173')
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'), headless=True,
        args=['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
    page = browser.new_page(viewport={'width':1280, 'height':800})
    errors=[]
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('response', lambda r: errors.append(f'HTTP {r.status} {r.url}') if r.status >= 400 else None)
    page.add_init_script('''
      window.testPad = {index:1,connected:true,id:'Virtual standard controller',mapping:'standard',axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))};
      window.testConnected = true;
      navigator.getGamepads = () => window.testConnected ? [null,window.testPad] : [];
    ''')
    page.goto(BASE+'/?quality=low&debug')
    page.locator('#enter:not([disabled])').wait_for(timeout=60000)
    page.wait_for_function("document.documentElement.classList.contains('has-controller')")
    page.evaluate('async()=>window.testGamepad=await import("/src/gamepad.js")')
    page.add_style_tag(content='.debug {display:none!important}')
    def state(): return page.evaluate('tokenHall.getState()')
    def scene(): return page.evaluate('tokenHall.getScene()')
    def press(i):
        page.wait_for_function('window.testGamepad.padReader.released && document.hasFocus()')
        page.evaluate('(i)=>{testPad.buttons[i]={pressed:true,value:1}}',i)
        page.wait_for_function('(i) => window.testGamepad.padState.buttons[i] === true',arg=i,timeout=15000)
        page.wait_for_timeout(100)
        page.evaluate('(i)=>{testPad.buttons[i]={pressed:false,value:0}}',i)
        page.wait_for_function('(i) => window.testGamepad.padState.buttons[i] === false',arg=i,timeout=15000)
        page.wait_for_timeout(100)
    def axes(x=0,y=0,rx=0,ry=0):
        page.evaluate('(a)=>testPad.axes=a',[x,y,rx,ry])
    Path('.playtest').mkdir(exist_ok=True)
    page.screenshot(path='.playtest/title.png')
    # Controller-only title entry and return through the settings menu.
    press(0)
    page.wait_for_function('tokenHall.getState().walking')
    before=scene()['player'];axes(.8,-.8)
    page.wait_for_function('(x)=>tokenHall.getScene().player.x>x+.01',arg=before['x'],timeout=20000);axes()
    after=scene()['player'];assert before != after, ('hall movement', before,after)
    press(9);page.wait_for_function('tokenHall.getState().settingsOpen')
    press(1);page.wait_for_function('!tokenHall.getState().settingsOpen')
    # Open picker with Y, navigate D-pad and select the first claw with A.
    press(3);page.locator('.arcade-picker').wait_for()
    press(13)
    assert page.evaluate("document.activeElement.classList.contains('arcade-claw')"), 'D-pad must focus the first cabinet'
    press(0);page.wait_for_function('tokenHall.getState().playing',timeout=60000)
    assert state()['activeMachine']=='claw'
    print('PASS controller menu navigation, nonzero controller slot, hall movement',flush=True)
    # Dead-zone drift and independent X/Z travel on the actual physics claw.
    before=scene()['machine'];axes(.08,-.08);page.wait_for_timeout(650);axes();after=scene()['machine']
    assert abs(after['x']-before['x'])<.001 and abs(after['z']-before['z'])<.001, 'stick drift'
    axes(.8,0);page.wait_for_function('(x)=>tokenHall.getScene().machine.x>x+.01',arg=after['x'],timeout=20000);axes();x=scene()['machine']
    assert x['x']>after['x']+.001, ('claw X',after['x'],x['x'])
    axes(0,-.8);page.wait_for_function('(z)=>tokenHall.getScene().machine.z<z-.01',arg=x['z'],timeout=20000);axes();z=scene()['machine']
    assert z['z']<x['z']-.001, ('claw Z',x['z'],z['z'])
    press(3);assert state()['machineCamera']=='overhead'
    press(3);assert state()['machineCamera']=='front'
    axes(0,0,.8,0);page.wait_for_function('tokenHall.getScene().cabinetWalker.active');axes()
    page.screenshot(path='.playtest/claw.png')
    press(0);assert scene()['machine']['phase']!='POSITIONING'
    press(9);page.wait_for_function('tokenHall.getState().paused');paused=scene()['machine'];page.wait_for_timeout(500)
    assert paused['remaining']==scene()['machine']['remaining']
    press(1);press(1);page.wait_for_function('!tokenHall.getState().playing')
    print('PASS claw analog X/Z, dead zone, camera toggle, A drop, pause, B exit',flush=True)
    for kind,label in [('cut','Snip & Win'),('spin','Egg Orbit'),('pusher','Coin Cascade'),('tower','Tower Tumble')]:
        press(3);page.locator('.arcade-picker').wait_for()
        page.locator('.arcade-card').filter(has=page.get_by_text(label,exact=True)).click()
        page.wait_for_function('(kind)=>tokenHall.getState().playing && tokenHall.getState().activeMachine===kind',arg=kind,timeout=60000)
        old=scene()['prizeGame']
        if kind in ('pusher','tower'):
            axes(.8,-.8);page.wait_for_function('(x)=>tokenHall.getScene().prizeGame.aimX>x+.01',arg=old['aimX'],timeout=20000);axes();new=scene()['prizeGame']
            assert new['aimX']>old['aimX'], (kind,'X aim')
            if kind=='tower': assert new['aimZ']<old['aimZ'], (kind,'Z aim')
            old=new
        press(0);new=scene()['prizeGame']
        if kind in ('pusher','tower'): assert new['ammo']==old['ammo']-1, (kind,'A drop',old,new)
        else: assert new['phase']!='READY', (kind,'A action',new)
        press(1);page.wait_for_function('!tokenHall.getState().playing')
        print('PASS', label, 'controller aim/action and exit',flush=True)
    # Unplug while held must clear all movement. Reconnection must require release.
    axes(1,0);page.evaluate('testConnected=false')
    page.wait_for_function("!document.documentElement.classList.contains('has-controller')")
    assert not page.evaluate("document.documentElement.classList.contains('has-controller')")
    page.evaluate('testConnected=true;testPad.axes=[0,0,0,0]')
    page.wait_for_function("document.documentElement.classList.contains('has-controller')")
    print('PASS controller disconnect/reconnect',flush=True)
    assert not errors, errors
    print('PASS no browser exceptions or failed asset requests',flush=True)
    browser.close()
