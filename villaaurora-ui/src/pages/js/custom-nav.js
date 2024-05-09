

let usernav = document.getElementById("usernav");
let servicenav = document.getElementById("servicenav");
let roomnav = document.getElementById("roomnav");
let transactionnav =  document.getElementById("transactionnav");
let testimonialnav = document.getElementById("testimonialnav");
let home = document.getElementById("home");

let section1 = document.getElementById("section1");
let section2 = document.getElementById("section2");
let section3 = document.getElementById("section3");
let section4 = document.getElementById("section4");

export const onUserNav = () => {
    section1.setAttribute("class","apper1");
    section2.setAttribute("class","appear2");
    section3.setAttribute("class","appear3");
    section4.setAttribute("class","appear4");
    
}

export const onServiceNav = () => {

    section2.setAttribute("class","appear2");
    section1.setAttribute("class","none1");
    section3.setAttribute("class","appear3");
    section4.setAttribute("class","appear4");
    
}

export const onRoomNav = () => {
    section3.setAttribute("class","appear3");
    section1.setAttribute("class","none1");
    section2.setAttribute("class","none2");

}

export const onTransactionNav = () => {
    section4.setAttribute("class","appear4");
    section1.setAttribute("class","none1");
    section2.setAttribute("class","none2");
    section3.setAttribute("class","none3");
}

export const onTestimonialNav = () => {

    section1.setAttribute("class","none1");
    section2.setAttribute("class","none2");
    section3.setAttribute("class","none3");
    section4.setAttribute("class","none4");
}