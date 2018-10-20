import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {PrivillegeService} from '../../core/privillege.service';

declare var $: any;

@Component({
    selector: 'app-zTree',
    templateUrl: './zTree.component.html',
    styleUrls: ['./zTree.component.scss']
})
export class ZTreeComponent implements OnInit {

    constructor(private privillegeService: PrivillegeService) {
    }

    public _treeLists;
    @Input()
    set treeLists(v) {
        this._treeLists = v
        this.initTree();
    }

    get treeLists() {
        return this._treeLists;
    }

    @Output() editEvent = new EventEmitter();
    @Output() deleteEvent = new EventEmitter();
    @Output() addEvent = new EventEmitter();
    public zTreeObj;
    public newCount = 1;
    public className = 'dark';

    ngOnInit() {
    }

    editNode(item) {
        this.editEvent.emit(item);
    }

    addNode(item) {
        this.addEvent.emit(item);
    }

    deleteNode(item) {
        this.deleteEvent.emit(item);
    }

    /*
    * 成功之后需要条用下面三个方法并传参saveAddNode，saveEditNode，saveDeleteNode
    * */
    private saveAddNode(treeNode, newId, newName) {
        this.zTreeObj.addNodes(treeNode, {id: newId, pId: treeNode.pId, name: newName});
    }

    public saveEditNode(treeNode, name) {
        treeNode.name = name;
        this.zTreeObj.updateNode(treeNode);
    }

    private saveDeleteNode(treeNode) {
        this.zTreeObj.removeNode(treeNode);
    }

    private initTree() {
        this.zTreeObj = $.fn.zTree.getZTreeObj('treeDemo');
        let setting = {
            view: {
                addHoverDom: this.addHoverDom.bind(this),
                removeHoverDom: this.removeHoverDom.bind(this),
                selectedMulti: false
            },
            edit: {
                enable: true,
                editNameSelectAll: true,
                showRemoveBtn: this.showRemoveBtn.bind(this),
                showRenameBtn: this.showRenameBtn.bind(this)
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeDrag: this.beforeDrag.bind(this),
                beforeEditName: this.beforeEditName.bind(this),
                beforeRemove: this.beforeRemove.bind(this),
                onRemove: this.onRemove.bind(this)
            }
        };
        $(document).ready(function () {
            $.fn.zTree.init($('#treeDemo'), setting, this.treeLists);
        }.bind(this));
    }

    public beforeRemove(treeId, treeNode) {
        this.zTreeObj.selectNode(treeNode);
        this.deleteNode(treeNode);
        return false;
    }

    public onRemove(e, treeId, treeNode) {
        this.showLog('[ onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; ' + treeNode.name);
    }

    public beforeEditName(treeId, treeNode) {
        this.zTreeObj.selectNode(treeNode);
        this.editNode(treeNode);
        return false;
    }

    public beforeDrag(treeId, treeNodes) {
        return false;
    }

    public showRemoveBtn(treeId, treeNode) {
        return treeNode.id != 1;
    }

    public showRenameBtn(treeId, treeNode) {
        return treeNode.id != 1;
    }

    public showLog(str) {
        console.log(str);
    }

    public addHoverDom(treeId, treeNode) {  //节点上悬浮时是否显示添加按钮
        let sObj = $('#' + treeNode.tId + '_span');
        let btn = $('#addBtn_' + treeNode.tId);
        if (treeNode.editNameFlag || btn.length > 0) return;
        const addStr = `<span class='button add' id='addBtn_${treeNode.tId}' title='add node' onfocus='this.blur();'></span>`;
        sObj.after(addStr);
        btn = $('#addBtn_' + treeNode.tId);
        if (btn) btn.bind('click', () => {
            this.addNode(treeNode);
        });
    };

    public removeHoverDom(treeId, treeNode) {  //节点上悬浮时是否显示删除
        $('#addBtn_' + treeNode.tId).unbind().remove();
    };
}
