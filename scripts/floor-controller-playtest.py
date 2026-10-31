import os
from playwright.sync_api import sync_playwright
BASE=os.environ.get('TOKENHALL_URL','http://127.0.0.1:4174')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':960,'height':640});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.add_init_script('window.pad={index:1,connected:true,id:"Virtual standard pad",axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false}))};navigator.getGamepads=()=>[null,pad]')
 page.goto(BASE+'/?quality=low&debug');page.locator('#enter:not([disabled])').wait_for(timeout=90000)
 page.evaluate('async()=>window.padModule=await import(new URL("gamepad.js",document.querySelector("script[type=module]").src))')
 def press(i):
  page.wait_for_function('padModule.padReader.released');page.evaluate('(i)=>pad.buttons[i].pressed=true',i);page.wait_for_function('(i)=>padModule.padState.buttons[i]',arg=i);page.wait_for_timeout(100);page.evaluate('(i)=>pad.buttons[i].pressed=false',i);page.wait_for_function('(i)=>!padModule.padState.buttons[i]',arg=i)
 press(0);page.locator('.arcade-picker').wait_for();page.locator('[data-game="plinko"]').focus();press(0);page.locator('.floor-game-hud').wait_for()
 assert page.evaluate('tokenHall.getScene().floorGame.phase')=='ready','Entering a cabinet must not spend a ball'
 page.evaluate('pad.axes=[.8,0,0,0]');page.wait_for_function('tokenHall.getScene().floorGame.aim>315');page.evaluate('pad.axes=[0,0,0,0]');press(0);page.wait_for_function('tokenHall.getScene().floorGame.phase!=="ready"')
 press(3);assert page.evaluate('tokenHall.getScene().floorGame.view')>.2;press(2);assert page.evaluate('tokenHall.getScene().floorGame.phase')=='ready'
 press(9);page.wait_for_function('tokenHall.getState().settingsOpen');press(1);page.wait_for_function('!tokenHall.getState().settingsOpen');assert page.evaluate('tokenHall.getScene().floorGame') is not None
 press(1);page.wait_for_function('tokenHall.getScene().floorGame===null')
 print('PASS controller slot 1: safe cabinet entry, analog aiming, action, side view, retry and exit',flush=True)
 print('WALK START',page.evaluate('({player:tokenHall.getScene().player,paused:tokenHall.getState().paused,walking:tokenHall.getState().walking})'),flush=True)
 page.keyboard.down('ShiftLeft');page.keyboard.down('KeyW');page.wait_for_function('tokenHall.getScene().player.z<1.8',timeout=60000);page.keyboard.up('KeyW');page.keyboard.down('KeyA');page.wait_for_function('tokenHall.getScene().player.x< -3.2',timeout=60000);page.keyboard.up('KeyA');page.keyboard.up('ShiftLeft');page.keyboard.down('KeyJ');page.wait_for_function('tokenHall.getScene().player.yaw>1.4',timeout=60000);page.keyboard.up('KeyJ');page.wait_for_function('tokenHall.getState().targeted==="added-rally"',timeout=60000);page.keyboard.press('KeyE');page.wait_for_function('tokenHall.getScene().floorGame?.id==="rally"')
 assert page.locator('canvas').count()==1;assert not errors,errors
 print('PASS actual hall walk-up, keyboard look, proximity targeting and E entry to the 3D rally cabinet',flush=True)
 b.close()
