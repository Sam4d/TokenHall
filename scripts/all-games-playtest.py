from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':1280,'height':800});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://127.0.0.1:4173/?quality=low');page.locator('#enter:not([disabled])').wait_for(timeout=60000);page.locator('#enter').click();page.locator('.arcade-picker').wait_for();assert page.locator('.arcade-card').count()==19
 ids=page.locator('.added-game').evaluate_all('(els)=>els.map(e=>e.dataset.game)')
 assert len(ids)==11
 for id in ids:
  name=page.locator(f'[data-game="{id}"] strong').inner_text();page.locator(f'[data-game="{id}"]').click();page.locator('.midway-game').wait_for();assert page.locator('.midway-game h1').inner_text()==name;page.keyboard.press('Space');page.locator('[data-close]').click();page.locator('#enter').click();page.locator('.arcade-picker').wait_for()
 assert not errors,errors
 print('PASS main Play button lists 19 games; all 11 additions launch directly with working playfields, no browser exceptions')
 b.close()
