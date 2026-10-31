"""Production 3D cabinet and keyboard smoke test. Start npm run preview first."""
import os
from playwright.sync_api import sync_playwright
BASE=os.environ.get('TOKENHALL_URL','http://127.0.0.1:4174')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':1024,'height':768});errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.on('response',lambda r:errors.append(f'{r.status} {r.url}') if r.status>=400 else None)
 page.goto(BASE+'/?quality=low&debug');page.locator('#enter:not([disabled])').wait_for(timeout=90000)
 snapshot=page.evaluate('tokenHall.getScene()');assert snapshot['cabinetCount']==19;assert len(snapshot['floorCabinets'])==11;assert all(c['meshes']>=8 for c in snapshot['floorCabinets'])
 ids=[c['id'] for c in snapshot['floorCabinets']]
 for id in ids:
  page.locator('.arcade-launch').click();page.locator(f'[data-game="{id}"]').click();page.locator('.floor-game-hud').wait_for()
  page.wait_for_function('(id)=>tokenHall.getScene().floorGame?.id===id',arg=id)
  assert page.locator('canvas').count()==1,'Every game must use the shared WebGL scene, no 2D playfield canvas'
  page.keyboard.press('Space');page.wait_for_function('tokenHall.getScene().floorGame.phase!=="ready"')
  page.locator('[data-camera]').click();assert page.evaluate('tokenHall.getScene().floorGame.view')>.2
  page.locator('[data-retry]').click();assert page.evaluate('tokenHall.getScene().floorGame.phase')=='ready'
  if id!='stack':
   page.keyboard.down('ArrowRight');page.wait_for_function('tokenHall.getScene().floorGame.aim>300.01');page.keyboard.up('ArrowRight')
  page.locator('[data-exit]').click();page.wait_for_function('tokenHall.getScene().floorGame===null')
  print('PASS 3D world cabinet, action, side view, retry and exit:',id,flush=True)
 assert not errors,errors
 print('PASS 19 physical stalls, 11 mesh playfields, one shared WebGL renderer; no failed assets/errors')
 b.close()
