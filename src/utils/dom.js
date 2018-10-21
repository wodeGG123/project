export default {
    getParents:function(dom){
        let parents = []
        get(dom)
        return parents
        function get(dom){
            if(dom.parentElement){
                parents.push(dom.parentElement)
                get(dom.parentElement)
            }
        }

    }
}