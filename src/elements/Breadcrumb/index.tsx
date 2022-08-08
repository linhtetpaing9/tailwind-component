import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"

const Breadcrumb = () => {
    return (
        <div>
            <nav className="sm:hidden" aria-label="Back">
                <a
                    href="#"
                    className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200"
                >
                    <ChevronLeftIcon
                        className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                    />
                    Back
                </a>
            </nav>
            <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                    <li>
                        <div className="flex">
                            <a
                                href="#"
                                className="text-sm font-medium text-gray-400 hover:text-gray-200"
                            >
                                Jobs
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRightIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-500"
                                aria-hidden="true"
                            />
                            <a
                                href="#"
                                className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
                            >
                                Engineering
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRightIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-500"
                                aria-hidden="true"
                            />
                            <a
                                href="#"
                                aria-current="page"
                                className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
                            >
                                Back End Developer
                            </a>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumb
