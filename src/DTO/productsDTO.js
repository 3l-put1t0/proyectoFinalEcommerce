export class ProductDTO{
    constructor(obj){
        obj.title == undefined ? this.title = obj.title : this.title= obj.title.toUpperCase(),
        this.description = obj.description,
        obj.code == undefined ? this.code = obj.code : this.code = obj.code.toUpperCase(),
        this.price = obj.price,
        this.status = obj.status,
        this.stock = obj.stock,
        obj.category == undefined ? this.category = obj.category : this.category = obj.category.toUpperCase(),
        this.thumbnails = obj.thumbnails
    }

}