/**
 * Created by zhangjianan on 2017/7/31.
 */

$(document).ready(function () {
    /*右上角菜单显示*/
    mui.init();
    mui.plusReady(function () {
    });
    mui('.mui-scroll-wrapper').scroll();
    mui('body').on('shown', '.mui-popover', function (e) {
        //console.log('shown', e.detail.id);//detail为当前popover元素
    });
    mui('body').on('tap', 'a', function () {
        window.top.location.href = this.href;
    });
    initMyCoupon();
});

function initMyCoupon() {
    var token = getCookie("token");
    $.post(RTTMALL_API.URL_COUPON_MINE,{
            client_token : token
        },
        function(data) {
        console.log(data);
            if (data != null) {
                if (data.code != "1") {
                    return;
                }else {
                    var couponData = data.data;
                    if(couponData.availableCoupon.length == 0){
                        console.info('availableCoupon none');
                    }else{
                        var item1 = template('Unused',couponData);
                        $("[data-type=Unused]").html(item1);
                    }
                    if(couponData.usedCoupon.length == 0){
                        console.info('usedCoupon none');
                    }else{
                        var item2 = template('Used',couponData);
                        $("[data-type=Used]").html(item2);
                    }
                    if(couponData.expiredCoupon.length == 0){
                        console.info('expiredCoupon none');
                    }else{
                        var item3 = template('Expried',couponData);
                        $("[data-type=Expried]").html(item3);
                    }
                }
            }
        }, "json");
}
