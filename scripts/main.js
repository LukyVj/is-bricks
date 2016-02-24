/*! Instantwall.js
Plugin for instantsearch.js using Bricks.js
*/
var instantWall=function (params) {
    var _app_id = params.appId,
    _api_key = params.apiKey,
    _index_name = params.indexName,
    _url_sync = params.urlSync || true,

    _search_box_container = params.searchBox.container,
    _search_box_placeholder = params.searchBox.placeholder,

    _hits_container = params.hits.container || '#hits-container',
    _hits_template_empty = params.hits.templates.empty || 'No results',
    _hits_template_item = params.hits.templates.item || '<strong>Hit {{objectID}}</strong>: {{{_highlightResult.name.value}}}',
    _hits_per_page = params.hits.hitsPerPage || 6,

    _bricks_container = params.bricks.container,
    _bricks_packed = params.bricks.packed,
    _bricks_size_base_columns = params.bricks.sizes.base.columns,
    _bricks_size_base_gutter = params.bricks.sizes.base.gutter,
    _bricks_size_mq1 = params.bricks.sizes.mq1.mq,
    _bricks_size_mq1_columns = params.bricks.sizes.mq1.columns,
    _bricks_size_mq1_gutter = params.bricks.sizes.mq1.gutter,
    _bricks_size_mq2 = params.bricks.sizes.mq2.mq,
    _bricks_size_mq2_columns = params.bricks.sizes.mq2.columns,
    _bricks_size_mq2_gutter = params.bricks.sizes.mq2.gutter,
    _bricks_size_mq3 = params.bricks.sizes.mq3.mq,
    _bricks_size_mq3_columns = params.bricks.sizes.mq3.columns,
    _bricks_size_mq3_gutter = params.bricks.sizes.mq3.gutter;

    var search = instantsearch({
      appId: _app_id,
      apiKey: _api_key,
      indexName: _index_name,
      urlSync: _url_sync
    });

    search.addWidget(
      instantsearch.widgets.searchBox({
        container: _search_box_container,
        placeholder: _search_box_placeholder,
        poweredBy: true
      })
      );

    search.addWidget(
      instantsearch.widgets.hits({
        container: _hits_container,
        templates: {
          empty: _hits_template_empty,
          item: _hits_template_item
        },
        hitsPerPage: _hits_per_page
      })
      );

    const sizes = [
    {
      columns: _bricks_size_base_columns,
      gutter: _bricks_size_base_gutter
    },
    {
      mq: _bricks_size_mq1,
      columns: _bricks_size_mq1_columns,
      gutter: _bricks_size_mq1_gutter
    },
    {
      mq: _bricks_size_mq2,
      columns: _bricks_size_mq1_columns,
      gutter: _bricks_size_mq1_gutter
    },
    {
      mq: _bricks_size_mq3,
      columns: _bricks_size_mq3_columns,
      gutter: _bricks_size_mq3_gutter
    }
    ];

    const  instance = Bricks({
      container: _bricks_container,
      packed: _bricks_packed,
      sizes: sizes
    });

    var renderBricks = {
      init: function(){

      },
    // Called every time there is new data
    render: function(options) {
      setTimeout(function(){
       instance.resize().pack();
       instance.update();
       


     }, 50)
    }
  };

  search.addWidget(renderBricks);


  document.addEventListener('DOMContentLoaded', function (event) {

    instance.resize().pack();
    instance.update();
    instance.pack();

  });

  window.addEventListener('load', function(){

    search.start();

    setTimeout(function(){

     instance.resize().pack();
     instance.update();
     instance.pack();

   }, 450)


  })

  window.addEventListener('resize', function(){
   instance.resize().pack();
  })

}


