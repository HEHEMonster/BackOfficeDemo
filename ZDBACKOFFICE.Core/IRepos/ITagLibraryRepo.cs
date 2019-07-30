namespace ZDBACKOFFICE.Core
{
    public interface ITagLibraryRepo
    {
        long TagSynchronization(string[] tags, int type, string objId);
    }
}


