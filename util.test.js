const puppeteer = require('puppeteer');

const {generateText ,checkAndGenerate } = require ('./util');

test('should output name and age', () => {
    let text = generateText('Marina', 43);
    expect(text).toBe('Marina (43 years old)');
    text = generateText('Anna', 13);
    expect(text).toBe('Anna (13 years old)');
});

test('should output data-less text', () =>{
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
})

test('should generate valid text output', () =>{
    const text = checkAndGenerate('Marina', 43);
    expect(text).toBe('Marina (43 years old)');
})

test('should open in browser, click and submit', async () =>{
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920, 1080']
    });

    const page = await browser.newPage();
    await page.goto('file:///C:/Users/marina/Documents/marina/study/js-testing-introduction-starting-setup/index.html', {waitUntil: 'load', timeout: 0});

    await page.click('input#name');
    await page.type('input#name','Alex');

    await page.click('input#age');
    await page.type('input#age', '14');

    await page.click('button#btnAddUser');

    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Alex (14 years old)');

}, 15000);