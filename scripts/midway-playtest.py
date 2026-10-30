from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':1440,'height':900});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://127.0.0.1:4173/?quality=low');page.locator('.midway-launch').wait_for(timeout=60000);page.locator('.midway-launch').click()
 assert page.locator('.midway-grid button').count()==8
 for i in range(8):
  page.locator('.midway-grid button').nth(i).click();page.locator('canvas[aria-label$="playfield"]').wait_for()
  assert page.locator('.midway-game h1').inner_text()
  page.keyboard.press('Space');page.wait_for_timeout(200)
  if i==6:page.screenshot(path='/tmp/peg-riot.png')
  page.locator('[data-retry]').click();page.locator('[data-menu]').click()
 page.keyboard.press('Escape');assert page.locator('.reference-arcade').count()==0
 assert not errors,errors
 print('PASS eight cabinet launches, keyboard actions, retries, menu return and Escape; no browser exceptions')
 b.close()
