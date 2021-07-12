import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(props) {
    return (
        <Box>
            <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px"}}/>
        </Box>
    );
}




export default function Home() {
    const githubUser = "mentalitydark";
    const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho'];
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
        <AlurakutMenu/>
        <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
            <ProfileSideBar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
            <Box>
                <h1 className="title">Bem-vindo(a)</h1>
                <OrkutNostalgicIconSet myInfos={myInfos} reactions={reactions}/>
            </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
            <ProfileRelationsBoxWrapper>
                <h2 className="smallTitle">
                    Pessoas da comunidade ({pessoasFavoritas.length})
                </h2>
                <ul>
                    {pessoasFavoritas.map((pessoa) => {
                        return (
                            <li>
                                <a href={`/users/${pessoa}`} key={pessoa}>
                                    <img src={`https://github.com/${pessoa}.png`}/>
                                    <span>{pessoa}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </ProfileRelationsBoxWrapper>
        </div>
        </MainGrid>
    </>
  );
}
