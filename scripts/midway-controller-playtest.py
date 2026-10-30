from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':1280,'height':800});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.add_init_script('window.pad={index:1,connected:true,id:"Test pad",axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false}))};navigator.getGamepads=()=>[null,pad]')
 page.goto('http://127.0.0.1:4173/?quality=low');page.locator('.midway-launch').wait_for(timeout=60000);page.evaluate('async()=>window.padModule=await import("/src/gamepad.js")')
 def press(i):
  page.wait_for_function('padModule.padReader.released');page.evaluate('(i)=>pad.buttons[i].pressed=true',i);page.wait_for_function('(i)=>padModule.padState.buttons[i]',arg=i);page.wait_for_timeout(100);page.evaluate('(i)=>pad.buttons[i].pressed=false',i);page.wait_for_function('(i)=>!padModule.padState.buttons[i]',arg=i)
 press(5);page.locator('.reference-arcade').wait_for();press(13);press(13);press(13);press(0);page.locator('.midway-game').wait_for();press(0)
 page.wait_for_function('document.querySelector("output").textContent.includes("TICKETS")',timeout=30000)
 tickets=page.evaluate('JSON.parse(localStorage.getItem("token-hall.collection.v1")).tickets');assert tickets>0
 page.wait_for_timeout(600);assert page.evaluate('JSON.parse(localStorage.getItem("token-hall.collection.v1")).tickets')==tickets
 press(2);assert page.locator('.midway-score').inner_text().startswith('0 TICKETS')
 press(1);page.locator('.midway-grid').wait_for();press(1);page.wait_for_function('!document.querySelector(".reference-arcade")')
 assert not errors,errors
 print('PASS controller R1 entry, A select/spin, single persistent ticket award, X retry, B back/exit')
 b.close()
