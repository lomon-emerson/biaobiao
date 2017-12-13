function getRestData(type) {

    api.showProgress({
        title: '加载中...',
        modal: false
    });
    var getMerchantUrl = '/merchant?filter=';
    var urlParam = {
        include: ["pics", "cityPointer", "typePointer"],
        where:{category:type}
    };
    api.ajax({
	    url:'http://120.26.207.162/jxsggzy/list_pageno.php',
	    method: 'get',
	 	cache: false,
	  	timeout: 30,
	  	dataType: 'json',
	  	data: {
	    	values:{tbname:	'zfcg0',pageno:1}
	  	}
    }, function (ret, err) {
        if (ret) {
            var content = $api.byId('lifeList');
            var tpl = $api.byId('act-template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret);
            api.refreshHeaderLoadDone();
            api.parseTapmode();
        } else {
            api.toast({msg: err.msg, location: 'middle'})
        }
        api.hideProgress();
    })
}

//filter data
function getDataByFilter(filter, id) {
    if (!id || !filter) {
        return;
    }
    api.showProgress({
        title: '加载中...',
        modal: false
    });
    var urlParam = {}, whereParam = {};
    var index=1;
    var curindex=1;
    var Num=2;
    var curCount=1;    
    whereParam[filter] = id;
    urlParam['where'] = whereParam;
    urlParam['include'] = ["pics", "cityPointer", "typePointer"];
    var getMerchantByCityIdUrl = '/merchant?filter=';
    api.ajax({
	    url:'http://120.26.207.162/jxsggzy/list_pageno.php',
	    method: 'get',
	 	cache: false,
	  	timeout: 30,
	  	dataType: 'json',
	  	data: {
	    	values:{tbname:	'zfcg0',pageno:1}
	  	}
    }, function (ret, err)
    
     {
        if (ret) {
            var content = $api.byId('lifeList');
            var tpl = $api.byId('act-template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret);
            //init tapmode
            api.parseTapmode();
        } else {
            api.toast({msg: err.msg, location: 'middle'})
        }
        api.hideProgress();
    })
}


function call(el) {
    event.stopPropagation();
    event.preventDefault();
    var num = $api.attr(el, 'rel');
    api.call({
        type: 'tel_prompt',
        number: num
    });
}

function openRest(el) {
    var dataId = $api.attr(el, 'data-id');

    api.openWin({
        name: 'restaurant',
        url: 'restaurant.html',
        opaque: true,
        pageParam: {dataId: dataId},
        vScrollBarEnabled: false
    });

}

apiready = function () {
    getRestData(api.pageParam.type);
    api.setRefreshHeaderInfo({
        visible: true,
        bgColor: '#f2f2f2',
        textColor: '#4d4d4d',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        showTime: true
    }, function (ret, err) {
        getRestData();
    });

}

