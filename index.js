const model = {
    items: [],
}

const view = {

    // 중복 입력 방직 (여러번 입력되는 문제가 있음)
    clean(){
        let range = document.createRange();
        let range2 = document.createRange();
        range.selectNodeContents(document.getElementById("list"));
        range2.selectNodeContents(document.getElementById("list2"));
        range.deleteContents();
        range2.deleteContents();
    },

    render() {
        this.clean();

        // 로컬스토리지에 저장되어 있는 데이터 불러오기
        let before_parse = localStorage.getItem('model');
        let parser = JSON.parse(before_parse);
        model.items = parser.items;

        if (model.items.length != 0) {

            let list = document.getElementById("list");
            let list2 = document.getElementById("list2");

            for (let i = 0; i < model.items.length; i++) {

                let item = document.createElement('li');
                let span = document.createElement('span');
                let check = document.createElement('a');
                let cross = document.createElement('a');
                let iCheck = document.createElement('i')
                let iTrash = document.createElement('i');

                item.className = "item";
                span.className = "item-text";
                check.className = "item-complete";
                cross.className = "item-delete";

                span.textContent = model.items[i].text;


                if (model.items[i].completed) {
                    span.setAttribute("style", "text-decoration: line-through; color: #bbb");
                    // 아이콘 
                    iCheck.setAttribute("class", "fas fa-check-square");
                    iCheck.setAttribute("style", "color: #003082");
                    iCheck.setAttribute("data-id", i);
                    iTrash.setAttribute("class", "fas fa-trash");
                    iTrash.setAttribute("style", "color: #003082")
                    iTrash.setAttribute("data-id", i);

                    // 아이콘에 온클릭 이벤트 추가
                    check.setAttribute("onclick", "controller.completeItem('" + i + "')");
                    cross.setAttribute("onclick", "controller.deleteItem('" + i + "')");

                    check.appendChild(iCheck);
                    cross.appendChild(iTrash);
                    item.appendChild(span);
                    item.appendChild(check);
                    item.appendChild(cross);
                    list2.appendChild(item);
                } else {
                    // 아이콘 
                    iCheck.setAttribute("class", "far fa-check-square");
                    iCheck.setAttribute("style", "color: #003082");
                    iCheck.setAttribute("data-id", i);
                    iTrash.setAttribute("class", "fas fa-trash");
                    iTrash.setAttribute("style", "color: #003082");
                    iTrash.setAttribute("data-id", i);

                    // 아이콘에 온클릭 이벤트 추가
                    check.setAttribute("onclick", "controller.completeItem('" + i + "')");
                    cross.setAttribute("onclick", "controller.deleteItem('" + i + "')");

                    check.appendChild(iCheck);
                    cross.appendChild(iTrash);
                    item.appendChild(span);
                    item.appendChild(check);
                    item.appendChild(cross);
                    list.appendChild(item);
                }
            }
        }
    },

    // 화면에 아이템 추가
    addItem() {
        if (((document.getElementById("add-item").value != "") && (document.getElementById("add-item").value != " "))) {
            let item = document.getElementById("add-item").value;
            controller.addItem(item);

            return false;
        }
    },
}

const controller = {
    init() {
        view.render();
    },

    // 할일 추가
    addItem(item) {
        let list_item = { text: item, completed: false };

        // 리스트 추가
        model.items.push(list_item);

        document.getElementById("add-item").value = "";

        // 로컬스토리지 추가
        localStorage.setItem('model', JSON.stringify(model));
        view.render();
    },

    // 할일 완료
    completeItem(item_index) {
        model.items[item_index].completed = !model.items[item_index].completed;

        // 로컬스토리지 내용 변경
        localStorage.setItem('model', JSON.stringify(model));
        view.render();
    },

    // 할일 지우기
    deleteItem(item_index) {

        model.items.splice(item_index, 1);

        // 로컬스토리지 수정
        localStorage.setItem('model', JSON.stringify(model));
        view.render();
    }
}

controller.init();