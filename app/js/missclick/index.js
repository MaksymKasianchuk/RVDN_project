function missClickHandler(refs, event){
    const { btn, menu, open} =  refs;
    const div = $(btn); 
    if (!div.is(event.target)
    && $(menu).has(event.target).length === 0) {
        $(menu).removeClass(open);
        // div.removeClass(open);
    }
}
export default missClickHandler;