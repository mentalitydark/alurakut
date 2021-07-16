import {SiteClient} from 'datocms-client';
export default async function Requests(req, res) {

    if(req.method == 'POST') {
        const TOKEN_FULL_ACCESS = '72daff30cb747d55f7ab47a36e207b';
        const TOKEN_READ_ONLY = '24c366b2808a61cf2169c770df3a0d';

        const client = new SiteClient(TOKEN_FULL_ACCESS);

        // Validar os dados, antes de sair cadastrando!
        const registroCriado = await client.items.create({
            itemType: "967628",
            ...req.body,
        })

        res.json({
            registroCriado: registroCriado
        });
    } else {
        res.status(404).json({
            message: 'Ainda não tem nada no GET, mas no POST tem!'
        })
    }
}