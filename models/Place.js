class Place {
    constructor (id, title, image, address, location){
        this.id = id.toString()
        this.title = title
        this.image = image
        this.address = address
        this.location = {
            lat: location.lat,
            lng: location.lng
        }
    }
}

export default Place