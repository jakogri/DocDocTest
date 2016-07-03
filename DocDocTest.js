/**
 * Created by gsolovyev on 02-Jul-16.
 */
"use strict";

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

var promise = browser.get('https://docdoc.ru/library');

var PageName = ['Акушерство','Аллергология','Андрология','Анестезиология','Венерология','Гастроэнтерология','Гематология','Гепатология',
'Гинекология','Гомеопатия','Дерматология','Диетология','Иммунология','Инфектология','Кардиология','Косметология',
'Логопедия','Маммология','Мануальная терапия','Массаж','Наркология','Неврология','Нефрология','Онкология','Ортопедия',
'Отоларингология','Офтальмология','Педиатрия','Пластическая хирургия','Проктология','Психиатрия','Психология','Психотерапия',
'Пульмонология','Ревматология','Репродуктология','Сексология','Стоматология','Терапия','Трихология','УЗ-диагностика','Урология',
'Флебология','Хирургия','Эндокринология'];

function IsTruePage(j)
{
    var i = j;
    var ParentElement = browser.findElement(webdriver.By.className("library_list columns_3"));
    var WebElement = ParentElement.findElement(webdriver.By.partialLinkText(PageName[i]));
    var CurPromise = browser.get(WebElement.getAttribute("href"));
    CurPromise.then(function()
    {
         var InPromise = browser.getTitle();
        InPromise.then(function(title)
        {
            if (title.toString().trim() == PageName[i].toString().trim())
            console.log('Страница ' + title + ' - найдена верно');
            else console.log('Вместо страницы ' + PageName[i] + ' найдена страница ' + title);
            browser.sleep(2000);
            browser.get('https://docdoc.ru/library');
            i++;
            if (i < PageName.length) IsTruePage(i);
            else return;
        });



    });
};

promise.then(function()
{
  IsTruePage(0);
});