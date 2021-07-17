import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileSideBar from '../src/components/ProfileSideBar';
import CardBox from '../src/components/CardBox';
import {myInfos, myReactions} from '../src/utils/constants';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import nookie from 'nookies';
import jwt from 'jsonwebtoken';


export default function Home(props) {
    const User = props.githubUser;
    const [comunidades, setComunidades] = React.useState([]);
    const [seguidores, setSeguidores] = React.useState([]);
    const [seguindo, setSeguindo] = React.useState([]);
    const [github, setgithub] = React.useState([]);
    React.useEffect(() => {
        // GET
        fetch(`https://api.github.com/users/${User}/followers`)
        .then((res) => {return res.json()})
        .then((result) => {setSeguidores(result)});

        fetch(`https://api.github.com/users/${User}/following`)
        .then(res => {return res.json()})
        .then(result => {setSeguindo(result)});

        fetch(`https://api.github.com/users/${User}`)
        .then(res => {return res.json()})
        .then(result => {setgithub(result)});

        // API GraphQL
        fetch(`https://graphql.datocms.com/`, {
            method: 'POST',
            headers: {
                'Authorization' : '24c366b2808a61cf2169c770df3a0d',
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({"query" : `query {
                allCommunities {
                  id
                  title
                  imageUrl
                  creatorslug
                }
              }`})
        }).then(res => res.json()).then(result => setComunidades(result.data.allCommunities));
    }, []);
  return ( /* html */
    <>
        <AlurakutMenu githubUser={github.login}/>
        <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
            <ProfileSideBar githubUser={github.login}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
            <Box>
                <h1 className="title">Bem-vindo(a), {github.name || github.login}</h1>
                <OrkutNostalgicIconSet myInfos={myInfos} reactions={myReactions}/>
            </Box>
            <Box>
                <h2 className="subtitle">O que você deseja fazer?</h2>
                <form onSubmit={(event) => { 
                    event.preventDefault();
                    const boxDadosDoForm = new FormData(event.target);
                    const comunidade = {
                        title: boxDadosDoForm.get('title'),
                        imageUrl: boxDadosDoForm.get('image'),
                        creatorslug: User
                    }
                    fetch('/api/communities', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(comunidade)
                    })
                    .then(async (res) => {
                        const dados = await res.json();
                        const comunidade = dados.registroCriado;
                        const comunidadesAtualizadas = [...comunidades, comunidade];
                        setComunidades(comunidadesAtualizadas)
                    })
                    
                }}>
                    <div>
                        <input  placeholder="Digite aqui o nome da comunidade" 
                            name="title" 
                            aria-label="Digite aqui o nome da comunidade"
                            autoComplete="off"/>
                    </div>
                    <div>
                        <input  placeholder="Coloque uma URL para usarmos de capa" 
                            name="image" 
                            aria-label="Coloque uma URL para usarmos de capa"
                            autoComplete="off"/>
                    </div>
                    <button>
                        Criar comunidade
                    </button>
                </form>
            </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
            <CardBox boxTitle="Seguidores" length={github.followers} boxDados={seguidores} type="github"/>
            <CardBox boxTitle="Seguindo" length={github.following} boxDados={seguindo} type="github"/>
            <CardBox boxTitle="Comunidade" boxDados={comunidades} type="comunidade"/>
        </div>
        </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
    const {USER_TOKEN} = nookie.get(context);
    console.log('cookue', nookie.get(context), "TOKEN", USER_TOKEN)
    const {githubUser} = jwt.decode(USER_TOKEN);
    const {status} = await fetch(`https://api.github.com/users/${githubUser}`).then(res => res);
    if(status !== 200) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    return {
        props: {
            githubUser
        },
    }
}
