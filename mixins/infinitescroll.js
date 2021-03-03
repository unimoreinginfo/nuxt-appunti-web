import { methods } from '@/lib/api';

export default function infiniteScrollComponent(){

    return {
        data: () => {
            return {
                pageNumber: 1,
                loadedPage: 1,
                load: true
            };
        },
        async created() {
            let firstPage = await this.getFirstPage();
            this.$data.pageNumber = firstPage.pages;
            this.$data.items = firstPage.result;
        },
        mounted: function() {
            window.addEventListener('scroll', this.onscroll);
        },
        destroyed: function() {
            window.removeEventListener('scroll', this.onscroll);
        },
        methods: {
            // roba infinite scroll
            addNotePages(page) {
                console.log(`loading page ${page}`);
                this.getPage(page).then((data) => {
                    this.notes = this.notes.concat(data);

                });
            },
            onscroll() {
                // chiamato per ogni scroll, debouncing scorrimento
                if (this.load) {
                    this.load = false;
                    setTimeout(() => { this.$data.load = true }, 500);
                    setTimeout(this.onScroll, 200);
                    
                }
            },
            onScroll() {
                // funzione che fa funzionare l'infinite scroll vero e proprio
                if (this.$data.loadedPage < this.pageNumber) {
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