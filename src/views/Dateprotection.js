
import React, { Component } from 'react';

import { withRouter, useHistory } from "react-router-dom";

import Footer from "../components/homepage/footer";

/**
 * data protection
 */
function DataProtection() {

    return (
        <div className="container pb-5 pt-5 ">
        <div className="row">
            <div className="col-12">
                <h3 >Datenschutz</h3>
            </div>
            <div className="col-12">
                <h6 className="text-left">Grundlegendes</h6>
                <p className="text-left">   
                    Diese Datenschutzerklärung soll die Nutzer dieser Website über die Art, den Umfang und den Zweck der Erhebung und Verwendung personenbezogener Daten durch den Websitebetreiber wbk informieren. 
                    Der Websitebetreiber nimmt Ihren Datenschutz sehr ernst und behandelt Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Vorschriften. Da durch neue Technologien und die ständige Weiterentwicklung dieser Webseite Änderungen an dieser Datenschutzerklärung vorgenommen werden können, empfehlen wir Ihnen sich die Datenschutzerklärung in regelmäßigen Abständen wieder durchzulesen.
                    Definitionen der verwendeten Begriffe (z.B. “personenbezogene Daten” oder “Verarbeitung”) finden Sie in Art. 4 DSGVO.
                </p>
            </div>

            <div className="col-12">
                <h6 className="text-left">Zugriffsdaten</h6>
                <p className="text-left">   
                    Wir, der Websitebetreiber bzw. Seitenprovider, erheben aufgrund unseres berechtigten Interesses (s. Art. 6 Abs. 1 lit. f. DSGVO) Daten über Zugriffe auf die Website und speichern diese als „Server-Logfiles“ auf dem Server der Website ab. Folgende Daten werden so protokolliert:
                    <ul>
                        <li>Besuchte Website</li>
                        <li>Uhrzeit zum Zeitpunkt des Zugriffes</li>
                        <li>Menge der gesendeten Daten in Byte</li>
                        <li>Quelle/Verweis, von welchem Sie auf die Seite gelangten</li>
                        <li>Verwendeter Browser</li>
                        <li>Verwendete IP-Adresse</li>
                    </ul>
                    Die Server-Logfiles werden für maximal 7 Tage gespeichert und anschließend gelöscht. Die Speicherung der Daten erfolgt aus Sicherheitsgründen, um z. B. Missbrauchsfälle aufklären zu können. Müssen Daten aus Beweisgründen aufgehoben werden, sind sie solange von der Löschung ausgenommen bis der Vorfall endgültig geklärt ist.
                </p>
            </div>

            <div className="col-12">
                <h6 className="text-left">Erfassung und Verarbeitung personenbezogener Daten</h6>
                <p className="text-left">   
                    Der Websitebetreiber erhebt, nutzt und gibt Ihre personenbezogenen Daten nur dann weiter, wenn dies im gesetzlichen Rahmen erlaubt ist oder Sie in die Datenerhebung einwilligen.
                    Als personenbezogene Daten gelten sämtliche Informationen, welche dazu dienen, Ihre Person zu bestimmen und welche zu Ihnen zurückverfolgt werden können – also beispielsweise Ihr Name, Ihre E-Mail-Adresse und Telefonnummer.

                    Diese Website können Sie auch besuchen, ohne Angaben zu Ihrer Person zu machen. Zur Verbesserung unseres Online-Angebotes speichern wir jedoch (ohne Personenbezug) Ihre Zugriffsdaten auf diese Website. Zu diesen Zugriffsdaten gehören z. B. die von Ihnen angeforderte Datei oder der Name Ihres Internet-Providers. Durch die Anonymisierung der Daten sind Rückschlüsse auf Ihre Person nicht möglich. 
                </p>
            </div>

            <div className="col-12">
                <h6 className="text-left">Umgang mit Kontaktdaten</h6>
                <p className="text-left">                       
                Nehmen Sie mit uns als Websitebetreiber durch die angebotenen Kontaktmöglichkeiten Verbindung auf, werden Ihre Angaben gespeichert, damit auf diese zur Bearbeitung und Beantwortung Ihrer Anfrage zurückgegriffen werden kann. Ohne Ihre Einwilligung werden diese Daten nicht an Dritte weitergegeben.

                </p>
            </div>

            <div className="col-12">
                <h6 className="text-left">Rechte des Nutzers</h6>
                <p className="text-left">   
                Sie haben als Nutzer das Recht, auf Antrag eine kostenlose Auskunft darüber zu erhalten, welche personenbezogenen Daten über Sie gespeichert wurden. Sie haben außerdem das Recht auf Berichtigung falscher Daten und auf die Verarbeitungseinschränkung oder Löschung Ihrer personenbezogenen Daten. Falls zutreffend, können Sie auch Ihr Recht auf Datenportabilität geltend machen. Sollten Sie annehmen, dass Ihre Daten unrechtmäßig verarbeitet wurden, können Sie eine Beschwerde bei der zuständigen Aufsichtsbehörde einreichen.

                </p>
            </div>

            <div className="col-12">
                <h6 className="text-left">Löschung von Daten</h6>
                <p className="text-left">                   
                Sofern Ihr Wunsch nicht mit einer gesetzlichen Pflicht zur Aufbewahrung von Daten (z. B. Vorratsdatenspeicherung) kollidiert, haben Sie ein Anrecht auf Löschung Ihrer Daten. Von uns gespeicherte Daten werden, sollten sie für ihre Zweckbestimmung nicht mehr vonnöten sein und es keine gesetzlichen Aufbewahrungsfristen geben, gelöscht. Falls eine Löschung nicht durchgeführt werden kann, da die Daten für zulässige gesetzliche Zwecke erforderlich sind, erfolgt eine Einschränkung der Datenverarbeitung. In diesem Fall werden die Daten gesperrt und nicht für andere Zwecke verarbeitet.

                </p>
            </div>

            <div className="col-12">
                <h6 className="text-left">Widerspruchsrecht</h6>
                <p className="text-left">   
                
                    Nutzer dieser Webseite können von ihrem Widerspruchsrecht Gebrauch machen und der Verarbeitung ihrer personenbezogenen Daten zu jeder Zeit widersprechen. 

                    Wenn Sie eine Berichtigung, Sperrung, Löschung oder Auskunft über die zu Ihrer Person gespeicherten personenbezogenen Daten wünschen oder Fragen bzgl. der Erhebung, Verarbeitung oder Verwendung Ihrer personenbezogenen Daten haben oder erteilte Einwilligungen widerrufen möchten, wenden Sie sich bitte an folgende E-Mail-Adresse: [E-Mail-Adresse einfügen]

                </p>
            </div>
            
            <div className="col-12">
                <h6 className="text-left">SSL-Verschlüsselung</h6>
                <p className="text-left">   
                Um Ihre übermittelten Daten bestmöglich zu schützen nutzen die Websitebetreiber eine SSL-Verschlüsselung. Sie erkennen derart verschlüsselte Verbindungen an dem Präfix “https://“ im Seitenlink in der Adresszeile Ihres Browsers. Unverschlüsselte Seite sind durch „http://“ gekennzeichnet.
                Sämtliche Daten, welche Sie an diese Website übermitteln – etwa bei Anfragen oder Logins – können dank SSL-Verschlüsselung nicht von Dritten gelesen werden.

                </p>
            </div>
            

                   
            </div>
            <div className="row flex-shrink-0 ">
                    <Footer></Footer>

                </div>
            </div>

)

}

export default withRouter(DataProtection);