// export const handleMenu = () => {
    
//     const menuBtn = document.getElementById("btnchange");
//     const closeBtn = document.getElementById("closeBtn");
//     const navigation = document.getElementById("sidebarMenu");
  
//     menuBtn.addEventListener("click", () => {
//       navigation.classList.add("show-navigation");
//     //   closeBtn.classList.add("show-close");
//     });
  
//     /*
//     closeBtn.addEventListener("click", () => {
//       navigation.classList.remove("show-navigation");
//       closeBtn.classList.remove("show-close");
//     }); */
  
//     // Check viewport size and hide menu button if width > 375
//     const checkViewport = () => {
//       if (window.innerWidth > 375) {
//         menuBtn.style.display = "none";
//         navigation.classList.add("show-navigation");
//       } else {
//         menuBtn.style.display = "block";
//         navigation.classList.remove("show-navigation");
//       }
//     };
  
//     // Listen for window resize event
//     window.addEventListener("resize", checkViewport);
  
//     // Initial check when the page loads
//     checkViewport();
//   };
  