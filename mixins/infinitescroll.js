import { methods } from '@/lib/api';

export default function infiniteScrollComponent(getFirstPage, getPage){

    return {
        data: () => {
            return {
                items: [],
                pageNumber: 1,
                loadedPage: 1,
                load: true
            };
        },
        
        methods: {
            async created() {
                let firstPage = getFirstPage();
                this.$data.pageNumber = firstPage.pages;
                this.$data.items = firstPage.result;
            },
            beforeMount() {
                window.addEventListener('scroll', this.onscroll);
            },
            beforeDestroy() {
                window.removeEventListener('scroll', this.onscroll);
            },
            // roba infinite scroll
            addNotePages(page) {
                console.log(`loading page ${page}`);
                getPage(page).then((data) => {
                    arr = arr.concat(data);

                });
            },
            onscroll() {
                // chiamato per ogni scroll, debouncing scorrimento
                if (this.$data.load) {
                    this.$data.load = false;
                    setTimeout(() => { this.$data.load = true }, 500);
                    setTimeout(this.onScroll, 200);
                }
            },
            onScroll() {
                // funzione che fa funzionare l'infinite scroll vero e proprio
                if (this.$data.loadedPage < notePages) {
                    console.log("fired onscroll");
                    let totalPageHeight = document.body.scrollHeight;
                    let scrollPoint = window.scrollY + window.innerHeight;
                    if (scrollPoint >= totalPageHeight - 200) {
                        this.$data.loadedPage++;
                        this.addNotePages(this.$data.loadedPage);
                    }
                }
            }
        }
    }
}