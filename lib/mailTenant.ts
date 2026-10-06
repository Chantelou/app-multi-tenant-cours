export const MailTenant = (nomTenant: string, email: string, password: string) => {
    const message = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <titleBienvenue sur Multi Tenant App</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, sans-serif; color: #1f2937;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden;"
        >
          <tr>
            <td style="background-color: #111827; padding: 28px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px;">
                Multi Tenant App
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 36px 32px;">
              <h2 style="margin-top: 0; color: #111827;">
                Bienvenue ${nomTenant} !
              </h2>

              <p style="font-size: 16px; line-height: 1.6;">
                Votre entreprise a été ajoutée avec succès à notre application
                <strong>Multi Tenant App</strong>.
              </p>

              <p style="font-size: 16px; line-height: 1.6;">
                Voici vos informations de connexion :
              </p>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="background-color: #f3f4f6; border-radius: 8px; margin: 24px 0;"
              >
                <tr>
                  <td style="padding: 20px; font-size: 15px; line-height: 1.8;">
                    <strong>Email :</strong> ${email}<br />
                    <strong>Mot de passe :</strong> ${password}
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" role="presentation" style="margin: 28px auto;">
                <tr>
                  <td
                    style="background-color: #2563eb; border-radius: 8px; text-align: center;"
                  >
                    <a
                      href="https://multitenantapp.com/tenant/login"
                      style="display: inline-block; padding: 14px 24px; color: #ffffff; text-decoration: none; font-weight: bold;"
                    >
                      Accéder à mon espace
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; line-height: 1.6; color: #6b7280;">
                Pour des raisons de sécurité, veuillez modifier votre mot de passe
                lors de votre première connexion.
              </p>

              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 0;">
                Cordialement,<br />
                <strong>L'équipe Multi Tenant App</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px; background-color: #f9fafb; text-align: center; color: #9ca3af; font-size: 12px;">
              Cet email a été envoyé automatiquement. Merci de ne pas y répondre.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

return message;
}