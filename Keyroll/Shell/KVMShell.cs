using Keyroll.KVM;
using System.IO;

namespace Keyroll.Shell
{
    public abstract class KVMShell : IShell
    {
        public bool Support(string mime)
        {
            if (mime == KVM.Memory.MIME)
                return true;
            return false;
        }

        public object Load(Stream stream)
        {
            var memory = Memory.Load(stream);
            return memory;
        }

        public abstract void Shell(object model);
    }
}
