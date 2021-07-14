import { ProfileRelationsBoxWrapper } from '../ProfileRelations';
export default function CardBox(props) {
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