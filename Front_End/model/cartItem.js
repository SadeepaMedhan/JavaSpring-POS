function CartItem(id, name, qty, price, qtyForSale, totPrice){
    var __id=id;
    var __name=name;
    var __qty=qty;
    var __price=price;
    var __qtyForSale =qtyForSale;
    var __totPrice =totPrice;

    this.setItemID=function (id){
        __id=id;
    }
    this.setItemName=function (name){
        __name=name;
    }
    this.setItemQty=function (qty){
        __qty=qty;
    }
    this.setItemPrice=function (price){
        __price=price;
    }
    this.getItemId=function (){
        return __id;
    }
    this.getItemName = function(){
        return __name;
    }
    this.getItemQty = function (){
        return __qty;
    }
    this.getItemPrice = function (){
        return __price;
    }
    this.setQtyForSale=function (qty){
        __qtyForSale=qty;
    }
    this.setTotPrice=function (price){
        __totPrice=price;
    }
    this.getQtyForSale = function (){
        return __qtyForSale;
    }
    this.getTotPrice=function (){
        return __totPrice;
    }
}