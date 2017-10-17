angular
  .module('app')
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
  vm.user = User.query();

  function postsCreate(){
    Post
      .save({post: vm.post})
      .$promise
      .then(()=> $state.go('postsIndex'));
  }
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
