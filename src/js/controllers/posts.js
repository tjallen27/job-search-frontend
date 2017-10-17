angular
  .module('App', [])
  .controller('PostsIndexCtrl', PostsIndexCtrl)
  .controller('PostsNewCtrl', PostsNewCtrl)
  .controller('PostsShowCtrl', PostsShowCtrl)
  .controller('PostsEditCtrl', PostsEditCtrl);

// This controller provides all the data for the index page
PostsIndexCtrl.$inject = ['Post', 'filterFilter', '$scope'];
function PostsIndexCtrl(Post, filterFilter, $scope){
  const vm = this;
  vm.all = Post.query();
}


PostsNewCtrl.$inject = ['Post', 'User', '$state'];
function PostsNewCtrl(Post, User, $state){
  const vm = this;
  vm.post = {};
  // set user var as revelant User
  vm.user = User.query();

  function postsCreate(){
    Post
      // for this post, save it as a new post
      .save({post: vm.post})
      .$promise
      // then go to the post index page
      .then(()=> $state.go('postsIndex'));
  }
  // store this function as a create
  vm.create = postsCreate;
}

PostsShowCtrl.$inject = ['Post', 'User', '$stateParams', '$state', '$auth'];
function PostsShowCtrl(Post, User, $stateParams, $state, $auth){
  const vm = this;

  if($auth.getPayload())
    vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.post = Post.get($stateParams);

  function postsDelete(){
    vm.post
      .remove()
      .then(() => $state.go('postsIndex'));
  }
  vm.delete = postsDelete;
}

PostsEditCtrl.$inject = ['Post', 'User', '$stateParams', '$state'];
function PostsEditCtrl(Post, User, $stateParams, $state){
  const vm = this;

  Post.get($stateParams).$promise.then((post)=>{
    vm.post = post;
  });

  vm.users = User.query();

  function postsUpdate(){
    Post
      .update({id: vm.post.id, post: vm.post})
      .$promise
      .$then(() => $state.go('postsShow', { id: vm.post.id }));
  }
  vm.update = postsUpdate;
}
