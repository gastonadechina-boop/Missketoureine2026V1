<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            ['category' => 'Vote', 'question' => 'Comment voter pour ma candidate préférée ?', 'answer' => 'Rendez-vous sur la page des candidates, sélectionnez celle que vous souhaitez soutenir, puis cliquez sur "Voter". Choisissez le nombre de votes et procédez au paiement via Mobile Money (MTN, Moov, Flooz).', 'sort_order' => 1],
            ['category' => 'Vote', 'question' => 'Combien coûte un vote ?', 'answer' => 'Le prix par vote est défini par l\'organisation et affiché sur la plateforme. Vous pouvez acheter plusieurs votes en une seule transaction.', 'sort_order' => 2],
            ['category' => 'Vote', 'question' => 'Puis-je voter plusieurs fois pour la même candidate ?', 'answer' => 'Oui, vous pouvez voter autant de fois que vous le souhaitez, dans la limite des votes maximum par jour définie par l\'organisation.', 'sort_order' => 3],
            ['category' => 'Vote', 'question' => 'Mes votes sont-ils sécurisés ?', 'answer' => 'Oui, toutes les transactions sont sécurisées via FedaPay, un service de paiement certifié. Chaque vote est tracé et vérifié.', 'sort_order' => 4],
            ['category' => 'Paiement', 'question' => 'Quels sont les moyens de paiement acceptés ?', 'answer' => 'Nous acceptons les paiements Mobile Money : MTN Mobile Money, Moov Money et Flooz. D\'autres moyens peuvent être ajoutés ultérieurement.', 'sort_order' => 5],
            ['category' => 'Paiement', 'question' => 'Le paiement a été débité mais mon vote n\'est pas comptabilisé', 'answer' => 'Patientez quelques instants et actualisez la page. Si le problème persiste, contactez notre support via la page Contact en fournissant la référence de transaction.', 'sort_order' => 6],
            ['category' => 'Paiement', 'question' => 'Puis-je être remboursé après un vote ?', 'answer' => 'Les votes sont des transactions fermes et non remboursables, sauf en cas d\'annulation du vote par l\'organisation pour cause de fraude avérée.', 'sort_order' => 7],
            ['category' => 'Compte', 'question' => 'Comment créer un compte ?', 'answer' => 'Cliquez sur "S\'inscrire" depuis la page de connexion. Remplissez vos informations (nom, email, mot de passe) et validez.', 'sort_order' => 8],
            ['category' => 'Compte', 'question' => 'Comment réinitialiser mon mot de passe ?', 'answer' => 'Cliquez sur "Mot de passe oublié" sur la page de connexion. Un lien de réinitialisation vous sera envoyé par email.', 'sort_order' => 9],
            ['category' => 'Compte', 'question' => 'Je ne reçois pas l\'email de confirmation', 'answer' => 'Vérifiez vos spams/courriers indésirables. Si le problème persiste, contactez notre support.', 'sort_order' => 10],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
