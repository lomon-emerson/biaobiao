function openLifeDetail(title,page,type){
    api.openWin({
        name: 'life-list',
        url: 'life-list.html',
        opaque: true,
        vScrollBarEnabled: true,
        pageParam:{title:title,page:page,type:type}
    });
}
