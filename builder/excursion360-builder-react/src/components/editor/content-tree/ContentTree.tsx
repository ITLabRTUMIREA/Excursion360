import React from 'react';
import { connect } from "react-redux";
import './ContentTree.scss';

import { ExcursionScene } from '../../../models/ExcursionScene';
import { ExcursionVector3 } from '../../../models/ExcursionVector3';
import { createScene, selectOneMoreScene, deselectOneScene } from "../../../redux/actions";
import { RootState } from '../../../redux/rootReducer';
import { CreateSceneAction, SelectOneMoreSceneAction, DeselectOneMoreSceneAction } from '../../../redux/types';
interface ContentTreeProps {
    createScene: (scene: ExcursionScene) => CreateSceneAction,
    selectOneMoreScene: (sceneId: string) => SelectOneMoreSceneAction,
    deselectOneScene: (sceneId: string) => DeselectOneMoreSceneAction,
    scenes: ExcursionScene[],
    selectedSceneIds: string[]
}
class ContentTree extends React.Component<ContentTreeProps> {
    indexer = 0;
    addScene(event: any) {
        this.props.createScene(
            new ExcursionScene(
                Date.now().toString(),
                `scene ${this.indexer++}`,
                new ExcursionVector3(this.props.scenes.length, 0, this.props.scenes.length)
            )
        );
    }
    toggleScene(sceneId: string) {
        if (this.props.selectedSceneIds.includes(sceneId)) {
            this.props.deselectOneScene(sceneId);
        } else {
            this.props.selectOneMoreScene(sceneId);
        }
    }
    render() {
        return (
            <div>
                <p>Content tree</p>
                <button onClick={e => this.addScene(e)} >Add scene</button>
                <ul className="objectsList">
                    {this.props.scenes && this.props.scenes.map(s =>
                        <li key={s.id}>
                            <p>{s.title}</p>
                            <input type="checkbox"
                                checked={this.props.selectedSceneIds.includes(s.id)}
                                onChange={() => this.toggleScene(s.id)} />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
const mapStateToProps = (state: RootState) => {
    return { scenes: state.editor.scenes, selectedSceneIds: state.editor.selectedSceneIds };
}
const mapDispatchToProps = {
    createScene, selectOneMoreScene, deselectOneScene
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentTree);