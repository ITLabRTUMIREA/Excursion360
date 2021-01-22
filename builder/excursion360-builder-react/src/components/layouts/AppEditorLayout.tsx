import React, { Component } from 'react';
import ContentTree from '../editor/content-tree/ContentTree';
import EditorScene from '../editor/editor-scene/EditorScene';
import SceneInspector from '../editor/scene-inspector/SceneInspector';
import Toolbar from '../editor/toolbar/Toolbar';
import LogsViewer from '../logs-viewer/LogsViewer';
import './AppEditorLayout.scss';

class div extends Component {
    render() {
        return (
            <div className="container">
                <div className="scene">
                    <EditorScene />
                </div>
                <div className="toolbar">
                    <Toolbar />
                </div>
                <div className="contentTree">
                    <ContentTree />
                </div>
                <div className="logsViewer">
                    <LogsViewer />
                </div>
                <div className="sceneInspector">
                    <SceneInspector />
                </div>
            </div>
        );
    }
}

export default div