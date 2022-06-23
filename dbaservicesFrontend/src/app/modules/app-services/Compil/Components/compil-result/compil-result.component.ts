import { TreeNode, MessageService } from 'primeng/api';
import { CompilResult } from './../../Models/CompilResult';

import { ActivatedRoute } from '@angular/router';
import { GlobalCompilService } from './../../Services/global-compil.service';
import { Component, OnInit } from '@angular/core';
import { Application } from '../../Models/Application';

@Component({
  selector: 'app-compil-result',
  templateUrl: './compil-result.component.html',
  styleUrls: ['./compil-result.component.css']
})
export class CompilResultComponent implements OnInit {
  selectedApp:Application;
  compilResult:CompilResult[];
  fileContentDialog:boolean=false
  files: TreeNode[]=[
    {
      "label": "Les fichiers d'erreurs",
      "data": "Documents Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "expanded": true,
      "selectable":false
     
    }
  ]
  content:string[]=[]
  selectedFile: TreeNode;
  constructor(private globalCompilService:GlobalCompilService,private activatedRoute: ActivatedRoute,private messageService: MessageService) { }

  ngOnInit(): void { this.activatedRoute.queryParams.subscribe(
    params=>{
      //console.log(params)

      this.selectedApp=JSON.parse(params.selectedApp) as Application;
      //console.log(this.selectedApp)
      this.getCompilResult();
    }
  )
   
  }

  getCompilResult(){
    this.globalCompilService.getCompilResult(this.selectedApp).toPromise().then(
      data=>{
        //console.log(data)
        this.compilResult=data
        this.makeTree(data)
      }
    )
  }

  makeTree(compilResult:CompilResult[]){
    let children:TreeNode[]=[];
     compilResult.forEach(
      file=>{
       // console.log(file)
          let child:TreeNode={
            "label":file.filename,
            "icon": "pi pi-file",
            "selectable":true,
            
            
          }
          children.push(child); 
      }
    )
    this.files[0].children=children
  }

  nodeSelect(event) {
   //console.log(event)
   let content:string=this.compilResult.filter(value=>value.filename==event.node.label)[0].filecontent
   this.content=content.split("\n")
  // console.log(this.content)
   this.fileContentDialog=true
  // this.messageService.add({severity: 'info', summary: event.node.label, detail: content});

}
hideFileContentDialog(){
  this.fileContentDialog=false
}
}
