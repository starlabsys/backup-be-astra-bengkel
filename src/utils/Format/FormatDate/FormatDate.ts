class FormatDate {
    public dateSend( date : string ) {
        // 2022-12-31T02:00:00+07:00
        const dateSplit = date.split( ' ' );
        const dateData = dateSplit[ 0 ].replace( /\//g, '-' );
        const timeData = dateSplit[ 1 ].replace( '.', ':' ).replace( '.', ':' );
        // const dateNow = new Date( dateData );
        const year = dateData.split( '-' )[ 2 ];
        const month = dateData.split( '-' )[ 1 ];
        const day = dateData.split( '-' )[ 0 ];
        const monthFormat = Number( month );//< 10 ? '0' + month : month;

        return `${ year }-${ monthFormat }-${ day }T${ timeData }+07:00`;
        // if ( day.length === 1 ) {
        //     return `${ year }-${ monthFormat }-${ day }T${ timeData }+07:00`;
        // }
        // else {
        //     return `${ year }-${ monthFormat }-${ day }T${ timeData }+07:00`;
        //
        // }
    }
}

export default new FormatDate();
