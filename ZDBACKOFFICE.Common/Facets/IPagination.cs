using System.Linq;
using System.Collections.Generic;

namespace ZDBACKOFFICE
{
    public interface IPagination
    {   
        int PageIndex { get; set; }
        int PageSize { get; set; }
        int TotalCount { get; set; }
    }
}
