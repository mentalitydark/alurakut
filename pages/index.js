import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(props) {
    return (
        <Box as="aside">
            <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px"}}/>
            <hr/>
            <p>
                <a className="boxLink" href={`https://github.com/${props.githubUser}`}>@{props.githubUser} </a>
            </p>
            <hr/>
            <AlurakutProfileSidebarMenuDefault/>
        </Box>
    );
}
function ProfileRelationsAreaBox(props) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {props.boxTitle} ({(props.boxDados).length})
            </h2>
            <ul>
                {(props.boxDados).slice(0,6).map((dado) => {
                    return (
                        <li key={(props.boxDados).id}>
                            <a href={`/${dado.type}/${dado.title}`}>
                                <img src={dado.image}/>
                                <span>{dado.title}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
}




export default function Home() {
    const githubUser = "mentalitydark";
    const [comunidades, setComunidades] = React.useState([
        {id: new Date().toISOString(), title: "Eu odeio acordar cedo!", image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"},
        {id: new Date().toISOString(), title: "Minecraft", image: "https://images-na.ssl-images-amazon.com/images/I/418cEZfh8-L.jpg"},
        {id: new Date().toISOString(), title: "Borderlands 3", image: "https://image.api.playstation.com/vulcan/ap/rnd/202010/2323/p50N4PBK9rNanGYKFecTvac5.png"},
        {id: new Date().toISOString(), title: "Steam", image: "https://tecnoblog.net/wp-content/uploads/2018/12/steam-logo-700x394.jpg"},
        {id: new Date().toISOString(), title: "O negócio da família", image: "https://lh3.googleusercontent.com/proxy/bNXJgPRS_l79EoVecIJO1td36cHw2Op3eL6tgJI8dAeTPbzzOOlwW_VVdOH9rSfKVmrK-3flmaIwm8RbwS0LuXOV8pcQpFvmVNkdBgM_Qa3Xyv3nIYq1SsJpLlqCXOeTH5Q"},
        {id: new Date().toISOString(), title: "Dark Souls", image: "https://criticalhits.com.br/wp-content/uploads/2020/12/cb109d5d1402ae804422a89aa168da00.jpg"},
    ]);
    
    
    const pessoasFavoritas = [{id: 1,title: 'juunegreiros', image: 'https://github.com/juunegreiros.png'}, 
                            {id: 2,title: 'omariosouto', image: 'https://github.com/omariosouto.png'},
                            {id: 3,title: 'peas', image: 'https://github.com/peas.png'}, 
                            {id: 4,title: 'rafaballerini', image: 'https://github.com/rafaballerini.png'}, 
                            {id: 5,title: 'marcobrunodev', image: 'https://github.com/marcobrunodev.png'},
                            {id: 6,title: 'felipefialho', image: 'https://github.com/felipefialho.png'}];
    const myInfos = [{ name: 'Recados', slug: '10', icon: 'book' },
                    { name: 'Fotos', slug: '1', icon: 'camera' },
                    { name: 'Videos', slug: '0', icon: 'video-camera' },
                    { name: 'Fãs', slug: '1', icon: 'star' },
                    { name: 'Mensagens', slug: '1', icon: 'email' }];
    const reactions = [{ name: 'Confiável', slug: '3', icon: 'smile' },
                    { name: 'Legal', slug: '2', icon: 'cool' },
                    { name: 'Sexy', slug: '0', icon: 'heart' }];
  return (
    <>
        <AlurakutMenu githubUser={githubUser}/>
        <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
            <ProfileSideBar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
            <Box>
                <h1 className="title">Bem-vindo(a)</h1>
                <OrkutNostalgicIconSet myInfos={myInfos} reactions={reactions}/>
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
            {console.log(comunidades)}
            <ProfileRelationsAreaBox boxTitle="Comunidade" boxDados={comunidades} type="comunidade"/>
            <ProfileRelationsAreaBox boxTitle="Pessoas Favoritas" boxDados={pessoasFavoritas} type="user"/>
        </div>
        </MainGrid>
    </>
  );
}
