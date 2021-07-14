import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileSideBar from '../src/components/ProfileSideBar';
import CardBox from '../src/components/CardBox';
import {User, INITIAL_COMMUNITIES, INITIAL_FAVORITES, myInfos, myReactions} from '../src/utils/constants';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

export default function Home() {
    const [comunidades, setComunidades] = React.useState(INITIAL_COMMUNITIES);
  return ( /* html */
    <>
        <AlurakutMenu githubUser={User}/>
        <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
            <ProfileSideBar githubUser={User}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
            <Box>
                <h1 className="title">Bem-vindo(a)</h1>
                <OrkutNostalgicIconSet myInfos={myInfos} reactions={myReactions}/>
            </Box>
            <Box>
                <h2 className="subtitle">O que você deseja fazer?</h2>
                <form method="POST" onSubmit={(event) => { 
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
            <CardBox boxTitle="Comunidade" boxDados={comunidades} type="comunidade"/>
            <CardBox boxTitle="Pessoas Favoritas" boxDados={INITIAL_FAVORITES} type="user"/>
        </div>
        </MainGrid>
    </>
  );
}
