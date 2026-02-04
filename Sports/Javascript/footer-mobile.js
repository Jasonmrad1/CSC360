
  //footer item
function toggleButtonDropDown_Footer(dropDownList, chevron){
    let isOpen = document.getElementById(dropDownList).getAttribute("data-isopen") === "true";

    if(isOpen){
        closeBlockFilter(dropDownList, chevron);
    }
    else{
        openBlockFilter(dropDownList, chevron);
    }

    function openBlockFilter(dropDownList, chevron) {
        const dropDown = document.getElementById(dropDownList);
        document.getElementById(chevron).style.transform = "rotate(180deg)";
        dropDown.style.height = "auto";
        dropDown.style.visibility = "visible";
        dropDown.style.padding = "0 10px";
        dropDown.style.marginBottom = "15px";
        dropDown.setAttribute("data-isopen", "true");
    }

    function closeBlockFilter(dropDownList, chevron) {
        const dropDown = document.getElementById(dropDownList);
        document.getElementById(chevron).style.transform = "rotate(0deg)";
        dropDown.style.height = "0";
        dropDown.style.padding = "0";
        setTimeout(() => {
            dropDown.style.visibility = "hidden";
        }, 300); // Wait for the height transition to finish before hiding
        dropDown.style.marginBottom = "0";
        dropDown.setAttribute("data-isopen", "false");
    }
}
window.onload=toggleButtonDropDown_Footer('aboutUs', 'aboutUsChevron')
