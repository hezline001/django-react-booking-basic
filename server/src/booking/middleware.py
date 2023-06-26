class GlobalMiddleware:
    def __init__(self,get_response) -> None:
        self.get_response = get_response

    def __call__(self, request):
        #check if login/signup path else assign request.user cache user for few mins too.
        print('Global middlewire')

        response = self.get_response(request)

        # print('after view')

        return response