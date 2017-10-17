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
