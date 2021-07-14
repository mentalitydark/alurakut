import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileSideBar from '../src/components/ProfileSideBar';
import CardBox from '../src/components/CardBox';
import {User ,INITIAL_COMMUNITIES, myInfos, myReactions} from '../src/utils/constants';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

export default function Home() {
    const [comunidades, setComunidades] = React.useState(INITIAL_COMMUNITIES);
    const [seguidores, setSeguidores] = React.useState([]);
    const [seguindo, setSeguindo] = React.useState([]);
    const [github, setgithub] = React.useState([]);
    React.useEffect(() => {
        fetch(`https://api.github.com/users/${User}/followers`)
        .then((res) => {return res.json()})
        .then((result) => {setSeguidores(result)});

        fetch(`https://api.github.com/users/${User}/following`)
        .then(res => {return res.json()})
        .then(result => {setSeguindo(result)});

        fetch(`https://api.github.com/users/${User}`)
        .then(res => {return res.json()})
        .then(result => {setgithub(result)})
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
                        id: new Date().getTime(),
                        title: boxDadosDoForm.get('title'),
                        image: boxDadosDoForm.get('image')
                    }
                    const comunidadesAtualizadas = [...comunidades, comunidade];
                    setComunidades(comunidadesAtualizadas)}}>
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
            <CardBox boxTitle="Seguidores" boxDados={seguidores} type="github"/>
            <CardBox boxTitle="Seguindo" boxDados={seguindo} type="github"/>
            <CardBox boxTitle="Comunidade" boxDados={comunidades} type="comunidade"/>
        </div>
        </MainGrid>
    </>
  );
}
