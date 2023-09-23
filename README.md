# AngularDialog

Modal Dialog Genérico com Angular Material

# Recursos

* Criação de modal dialog via component tags
* Criação de modal dialog via service
* Modal dialog para padronização de UI
* Modal dialog para confirmação de ações
* Mock de requisição HTTP

# Uso

## Via component tags

O componente `<app-dialog></app-dialog>` é utilizado para padronização de interface de usuário e pode ser reutilizado via componente tags.
Sua reutilização está representada no componente `<app-confirm-dialog></app-confirm-dialog>`.

Por não ter valor em sua inicialização, o componente `<app-confirm-dialog></app-confirm-dialog>` necessariamente precisa utilizar os `seletores` de `<app-dialog></app-dialog>` para exibir os dados em seus devidos lugares.

São eles: `<h1 title></h1>`, `<div content></div>`, `<button cancel-button></button>` e `<button confirm-button></button>`

Declarados como: `<ng-content select="[title]"></ng-content>`, `<ng-content select="[content]"></ng-content>`, `<ng-content select="[cancel-button]"></ng-content>` e `<ng-content select="[confirm-button]"></ng-content>`

~~~html
<app-dialog>
  <h1 title>{{ data?.title }}</h1>

  <div content>
    {{ data?.message }}
  </div>

  <button cancel-button mat-raised-button color="warn" mat-dialog-close="true" (click)="closeDialog()">
    {{ data?.titleCancelAction }}
  </button>
  <button confirm-button mat-raised-button color="primary" mat-dialog-close="false" (click)="confirmDialog()">
    {{ data?.titleConfirmAction }}
  </button>
</app-dialog>
~~~

Para outros componentes, basta prover valor para o atributo `dialogData` (nesse caso via service) já na inicialização do diálogo e utilizar somente os selects de botões caso haja ação a ser executada através dele.

~~~html
<app-dialog>
  <button mat-raised-button color="warn" cancel-button mat-dialog-close="true" (click)="closeDialog()">Cancelar</button>
  <button mat-raised-button color="primary" confirm-button mat-dialog-close="false" (click)="confirmDialog()">Confirmar</button>
</app-dialog>
~~~

Ou pode-se, ainda, deixar o contéudo estático no HTML, pois o atributo `object` em `dialogData` é opcional.

~~~html
<app-dialog>
  <div content>
    Algum conteúdo aqui
  </div>

  <button mat-raised-button color="warn" cancel-button mat-dialog-close="true" (click)="closeDialog()">Cancelar</button>
  <button mat-raised-button color="primary" confirm-button mat-dialog-close="false" (click)="confirmDialog()">Confirmar</button>
</app-dialog>
~~~

## Via service

### Dialog Confirmação

O pop-up de confirmação genérica funciona por meio de um service que executa uma ação após o clique no botão `Confimar` ou fecha o diálogo após clique no botão `Cancelar`.
A confirmação pode executar uma chamada http ao servidor. Nesse caso, o observable do diálogo é confirmado e em seguida "chama" o observable da requisição http.

~~~javascript
openConfirmDialog(): void {
  const confirm$ = this.confirmDialogService.openConfirmDialog();
  confirm$.asObservable().pipe(
    take(1),
    switchMap(confirm => confirm ? true : false)
  ).subscribe(
    (data) => console.log(data)
  );
}
~~~

**Obs: vide mock da requisição para no arquivo data.service.ts**

Caso a intenção não seja executar um novo observable após a confirmação, basta indicar a função assíncrona.

~~~javascript
openConfirmDialog(): void {
  const confirm$ = this.confirmDialogService.openConfirmDialog();
  confirm$.asObservable().pipe(
    take(1),
    switchMap(async (confirm) => confirm ? console.log(true) : console.log(false))
  ).subscribe();
}
~~~

#### Atributos

Nome       | Valor Padrão       | Tipo            | Descrição
-----------|--------------------|-----------------|----------
data       | new ConfirmDialog()| ConfirmDialog   |recebe dados da modal
confirm    | new Subject()      | Subject<boolean>|recebe confirmação da ação solicitada


### Dialog UI

Aqui temos as chamadas diretamente do service do Angular Material para abertura do pop-up na tela. Aqui definimos qual tipo de objeto e se ele será passado para dentro da modal.
Vale lembrar que, caso o obejeto seja passado por aqui, o conteúdo dentro do seletor `content` será suprimido da tela.

~~~javascript
openDialog(): void {
  let dialogData = new DialogData<any>({
    title: 'Title', 
    size: 'small', //'small' || 'medium' || 'large'
    object: 'Any object type here' // não obrigatório
  });

  this.dialog.open(DialogComponent, {
    data: dialogData,
  });
}
~~~

#### Atributos

Nome       | Valor Padrão| Tipo                         | Descrição
-----------|-------------|------------------------------|----------
dialogData | undefined   | DialogData<T>                |recebe dados da modal
dialogRef  | undefined   | MatDialogRef<DialogComponent>|recebe a referência da modal

