import { ProfileRelationsBoxWrapper } from '../ProfileRelations';
export default function CardBox(props) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {props.boxTitle} ({(props.boxDados).length})
            </h2>
            <ul>
                {(props.boxDados).map((dado) => {
                    return (
                        <li key={(props.boxDados).id}>
                            <a href={`${props.type == "github" ? 'https://github.com/': '/'+props.type+'/'}${dado.login || dado.title}`}>
                                <img src={dado.avatar_url || dado.imageUrl || `https://picsum.photos/200/300`}/>
                                <span>{dado.login || dado.title}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
}