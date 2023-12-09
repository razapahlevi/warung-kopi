document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'House Blend', img: '1.jpg', price: 80000},
            { id: 2, name: 'Columbia Castillo', img: '2.jpg', price: 100000},
            { id: 3, name: 'Robusta', img: '3.jpg', price: 90000},
            { id: 4, name: 'Robusta Brazil', img: '4.jpg', price: 150000},
        ],

    }));


    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek apakah ada barang yg sama dicart
            const cartItem = this.items.find((item) => item.id === newItem.id);


            // Jika belum ada cart masih kosong
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                this.items = this.items.map((item) => {
                    
                    if (item.id !== newItem.id){
                        return item;
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {

            const cartItem = this.items.find((item) => item.id === id);

            if(cartItem.quantity > 1) {
                this.items = this.items.map((item) => {

                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {

                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });
});

// Koversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    }).format(number);  
};

// Pada bagian app.js atau di bagian bawah HTML sebelum tutup body
document.addEventListener("DOMContentLoaded", function () {
    const eyeIcons = document.querySelectorAll(".item-detail-button");
    const modal = document.getElementById("item-detail-modal");
    const closeIcon = document.querySelectorAll(".close-icon");
  
    eyeIcons.forEach((icon) => {
      icon.addEventListener("click", function () {
        modal.style.display = "block";
      });
    });
  
    closeIcon.addEventListener("click", function () {
      modal.style.display = "none";
    });
  });