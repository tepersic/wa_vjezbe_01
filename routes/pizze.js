import express from 'express';
const router = express.Router();


const pizze = [
    { id: 1, naziv: 'Margerita', cijena: 7.0 },
    { id: 2, naziv: 'Capricciosa', cijena: 9.0 },
    { id: 3, naziv: 'Šunka sir', cijena: 8.0 },
    { id: 4, naziv: 'Vegetariana', cijena: 12.0 },
    { id: 5, naziv: 'Quattro formaggi', cijena: 15.0 }
    ];
    router.get('/', (req, res) => {
    // ruta za dohvat svih pizza, pišemo router.get umjesto app.get
    res.json(pizze);
    });

    router.get('/pizze', (req, res) => {
        res.json(pizze);
        });

router.get('/pizze/:id', (req, res) => {
    const id_pizza = req.params.id; // dohvaćamo id parametar iz URL-a
    if (isNaN(id_pizza)) {
        // provjeravamo je li id_pizza "Not a Number"
        res.json({ message: 'Proslijedili ste parametar id koji nije broj!' });
        return;
    }
        const pizza = pizze.find(pizza => pizza.id == id_pizza);
    if (pizza) {
     // ako je pronađeno podudaranje, vratimo pizza objekt
    res.json(pizza);
    } else {
    // ako je rezultat undefined, vratimo poruku da pizza ne postoji
    res.json({ message: 'Pizza s traženim ID-em ne postoji.' });
    }
});

router.post('/naruci', (req, res) => {
    const narudzba = req.body;
    const kljucevi = Object.keys(narudzba);
    if (!(kljucevi.includes('pizza') && kljucevi.includes('kolicina') && kljucevi.includes('velicina'))) {
    res.send('Niste poslali sve potrebne podatke za narudžbu!');
    return;
    }
    res.send(`Vaša narudžba za ${narudzba.pizza} (${narudzba.velicina}) i kolicine ${narudzba.kolicina} je uspješno
    zaprimljena!`);
    });

router.put('/pizze/:id', (req, res) => {
        const id_pizza = req.params.id;
        const nova_pizza = req.body;
        nova_pizza.id = id_pizza; // dodajemo id pizze u objekt, u slučaju da ga klijent nije poslao u tijelu zahtjeva
        const index = pizze.findIndex(pizza => pizza.id == id_pizza);
        if (index !== -1) {
        pizze[index] = nova_pizza;
        res.json(pizze[index]);
        } else {
        res.json({ message: 'Pizza s traženim ID-em ne postoji.' });
        }
        });

router.patch('/pizze/:id', (req, res) => {
        const id_pizza = req.params.id;
        const nova_pizza = req.body;
        const index = pizze.findIndex(pizza => pizza.id == id_pizza);
        if (index !== -1) {
        for (const key in nova_pizza) {
        pizze[index][key] = nova_pizza[key];
        }
        // ili
        // pizze[index] = { ...pizze[index], ...nova_pizza }; // spread operator
        res.json(pizze[index]);
        } else {
        res.json({ message: 'Pizza s traženim ID-em ne postoji.' });
        }
});

router.delete('/pizze/:id', (req, res) => {
        const id_pizza = req.params.id;
        const index = pizze.findIndex(pizza => pizza.id == id_pizza);
        if (index !== -1) {
        pizze.splice(index, 1);
        res.json({ message: 'Pizza uspješno obrisana.' });
        } else {
        res.json({ message: 'Pizza s traženim ID-em ne postoji.' });
        }
});
    
    export default router;