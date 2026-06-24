<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de mot de passe</title>
    <style>
        body { margin:0; padding:0; background:#070707; font-family:'Montserrat',Arial,sans-serif; }
        .container { max-width:600px; margin:0 auto; padding:40px 20px; }
        .header { text-align:center; padding:30px 0; }
        .header h1 { color:#d4af37; font-family:'Playfair Display',Georgia,serif; font-size:24px; margin:0; }
        .content { background:#0f0f0f; border:1px solid rgba(212,175,55,0.12); border-radius:12px; padding:40px; }
        .content p { color:#e0e0e0; font-size:14px; line-height:1.6; margin:0 0 20px; }
        .btn { display:inline-block; padding:14px 36px; background:linear-gradient(135deg,#d4af37,#f5c542); color:#000; text-decoration:none; border-radius:8px; font-weight:600; font-size:14px; }
        .footer { text-align:center; padding:20px; color:#666; font-size:12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Miss Ketou Reine</h1>
        </div>
        <div class="content">
            <p>Bonjour {{ $user->name }},</p>
            <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>
            <p style="text-align:center; margin:30px 0;">
                <a href="{{ $resetUrl }}" class="btn">Réinitialiser mon mot de passe</a>
            </p>
            <p>Ce lien expire dans 60 minutes. Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Miss Ketou Reine. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
