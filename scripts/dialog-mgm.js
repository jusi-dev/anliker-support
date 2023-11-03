function showModal(clicked_element) {
    let modal = clicked_element.nextElementSibling;
    modal.showModal();
}

function toggleCollapse(clicked_element) {
    let buttonParent = clicked_element.parentElement;
    let collapse2 = buttonParent.previousElementSibling;
    collapse2.classList.toggle("collapse");
    collapse2.classList.contains("collapse") ? clicked_element.innerHTML = "Mehr anzeigen" : clicked_element.innerHTML = "Weniger anzeigen";
}