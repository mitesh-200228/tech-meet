const fs = require('fs').promises;
const puppeteer = require('puppeteer');
const Grades = require('../models/StoreData');

class MainController {
    async GetDatas(req, res) {
        let rollno = req.body.rollno;
        let pwd = req.body.pwd;
        console.log(rollno, pwd);
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://www.iitm.ac.in/viewgrades/login.php", { waitUntil: 'load', timeout: 0 });
        // await page.waitForSelector('input[name="rollno"]');
        // await page.focus('input[name="rollno"]');
        // await page.focus('input[name="pwd"]');
        await page.type('input[name="rollno"]', rollno);
        await page.type('input[name="pwd"]', pwd);
        await page.click('input[name="submit"]');
        const cookieString = await page.cookies();
        await fs.writeFile('./cookie.txt', JSON.stringify(cookieString, null, 2));
        console.log(cookieString);
        await page.goto("https://www.iitm.ac.in/viewgrades/studentauth/btechdual.php");
        await page.setCookie(...cookieString);
        const result = await page.evaluate(() => {
            let hx = document.getElementsByTagName('th');
            let hd = document.getElementsByTagName('tr');
            hy = [...hx];
            hp = [...hd];
            if (hy.length > 0 && hp.length > 0) {
                let inforofuser = [];
                let courses = [];
                let lng = hy.length;
                for (let i = 0; i < 5; i++) {
                    inforofuser.push(hy[i].innerHTML);
                }
                
                for (let i = 0; i < hp.length; i++) {
                    courses.push(hp[i].innerText);
                }
                let arr = [];
                for (let i = 0; i < courses.length; i++) {
                    const dummyarr = courses[i].split('\t');
                    arr.push(dummyarr);
                }
                let mx = [];
                mx.push(inforofuser, arr);
                return mx;
            }else{
                return null;
            }
        });
        const courses = result;
        // return res.status(200).json({messages: courses,type:typeof(courses[1][0])});
        await browser.close();
        if(courses === undefined || courses === null){
            return res.status(401).json({ data: 'Unauthorized'});
        }
        const FireFunctions = async () => {
            try {
                await Grades.create({ userinfo: courses }).then((response) => {
                    return res.status(200).json({ data: response._id });
                }).catch((err) => {
                    return res.status(500).json({ data: 'internal server Error' });
                });
            } catch (error) {
                return res.status(500).json({ data: 'internal server Error' });
            }
        }
        FireFunctions();
    }async GetDatas1(req, res) {
        const _id = req.body._id;
        console.log(_id);
        try {
            await Grades.findOne({_id:_id}).then((response) => {
                return res.status(200).json({ data: response});
            }).catch(err => {
                console.log(err);
                return res.status(500).json({ data: 'internal server Error' });
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json({ data: 'internal server Error'});
        };
    }
}
module.exports = new MainController();