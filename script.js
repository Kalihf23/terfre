// Configuration Supabase - À REMPLIR AVEC VOS VALEURS
const SUPABASE_URL = 'aitemjeksasutmypxapq@supabase.co'; // Remplacez par votre URL Supabase (ex: https://votre-projet.supabase.co)
const SUPABASE_ANON_KEY = 'sb_publishable_eo1pSh2Q5KLRyz7Mrj5fkw_h0XX9iqD'; // Remplacez par votre clé anonyme

// Initialiser Supabase
const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Éléments du DOM
const form = document.getElementById('inscriptionForm');
const messageDiv = document.getElementById('message');

// Gestion de la soumission du formulaire
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Récupérer les valeurs
    const nom = document.getElementById('nom').value.trim();
    const ville = document.getElementById('ville').value.trim();

    // Valider les champs
    if (!nom || !ville) {
        showMessage('Veuillez remplir tous les champs', 'error');
        return;
    }

    // Afficher le message de chargement
    showMessage('Envoi en cours...', 'loading');
    form.querySelector('.btn-submit').disabled = true;

    try {
        // Envoyer les données à Supabase
        const { data, error } = await supabase
            .from('inscriptions') // Remplacez par le nom de votre table Supabase
            .insert([
                {
                    nom: nom,
                    ville: ville,
                    date_inscription: new Date().toISOString()
                }
            ]);

        if (error) {
            throw error;
        }

        // Succès
        showMessage('✓ Inscription réussie!', 'success');
        form.reset();
        
        // Réinitialiser le bouton après 2 secondes
        setTimeout(() => {
            form.querySelector('.btn-submit').disabled = false;
        }, 2000);

    } catch (error) {
        console.error('Erreur:', error);
        showMessage(`Erreur: ${error.message || 'Une erreur est survenue'}`, 'error');
        form.querySelector('.btn-submit').disabled = false;
    }
});

// Fonction pour afficher les messages
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    
    // Retirer le message après 5 secondes si c'est un succès
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.className = 'message';
        }, 5000);
    }
}

// Valider en temps réel (lettres et espaces uniquement)
document.getElementById('nom').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s-]/g, '');
});

document.getElementById('ville').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s-]/g, '');
});
