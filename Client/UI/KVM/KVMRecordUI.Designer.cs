namespace Keyroll
{
    partial class KVMRecordUI
    {
        /// <summary> 
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 组件设计器生成的代码

        /// <summary> 
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.TxtKey = new Sartrey.UI.WinForms.InputTextUI();
            this.BtnUpdate = new System.Windows.Forms.Button();
            this.TxtValue = new Sartrey.UI.WinForms.InputTextUI();
            this.BtnCopy = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // TxtKey
            // 
            this.TxtKey.BackColor = System.Drawing.Color.Transparent;
            this.TxtKey.Dock = System.Windows.Forms.DockStyle.Top;
            this.TxtKey.InputText = "";
            this.TxtKey.LabelText = "Key";
            this.TxtKey.LabelWidth = 40;
            this.TxtKey.Location = new System.Drawing.Point(10, 10);
            this.TxtKey.Name = "TxtKey";
            this.TxtKey.OldText = "";
            this.TxtKey.Padding = new System.Windows.Forms.Padding(1);
            this.TxtKey.PasswordText = '\0';
            this.TxtKey.Size = new System.Drawing.Size(280, 25);
            this.TxtKey.TabIndex = 0;
            // 
            // BtnUpdate
            // 
            this.BtnUpdate.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.BtnUpdate.Location = new System.Drawing.Point(10, 360);
            this.BtnUpdate.Name = "BtnUpdate";
            this.BtnUpdate.Size = new System.Drawing.Size(280, 30);
            this.BtnUpdate.TabIndex = 3;
            this.BtnUpdate.Text = "Update";
            this.BtnUpdate.UseVisualStyleBackColor = true;
            this.BtnUpdate.Click += new System.EventHandler(this.BtnUpdate_Click);
            // 
            // TxtValue
            // 
            this.TxtValue.BackColor = System.Drawing.Color.Transparent;
            this.TxtValue.Dock = System.Windows.Forms.DockStyle.Top;
            this.TxtValue.InputText = "";
            this.TxtValue.LabelText = "Value";
            this.TxtValue.LabelWidth = 40;
            this.TxtValue.Location = new System.Drawing.Point(10, 35);
            this.TxtValue.Name = "TxtValue";
            this.TxtValue.OldText = "";
            this.TxtValue.Padding = new System.Windows.Forms.Padding(1);
            this.TxtValue.PasswordText = '\0';
            this.TxtValue.Size = new System.Drawing.Size(280, 100);
            this.TxtValue.TabIndex = 1;
            // 
            // BtnCopy
            // 
            this.BtnCopy.Dock = System.Windows.Forms.DockStyle.Top;
            this.BtnCopy.Location = new System.Drawing.Point(10, 135);
            this.BtnCopy.Name = "BtnCopy";
            this.BtnCopy.Size = new System.Drawing.Size(280, 30);
            this.BtnCopy.TabIndex = 2;
            this.BtnCopy.Text = "Copy to clipboard";
            this.BtnCopy.UseVisualStyleBackColor = true;
            this.BtnCopy.Click += new System.EventHandler(this.BtnCopy_Click);
            // 
            // KVMRecordUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.BtnCopy);
            this.Controls.Add(this.TxtValue);
            this.Controls.Add(this.BtnUpdate);
            this.Controls.Add(this.TxtKey);
            this.Name = "KVMRecordUI";
            this.Padding = new System.Windows.Forms.Padding(10);
            this.Size = new System.Drawing.Size(300, 400);
            this.ResumeLayout(false);

        }

        #endregion

        private Sartrey.UI.WinForms.InputTextUI TxtKey;
        private System.Windows.Forms.Button BtnUpdate;
        private Sartrey.UI.WinForms.InputTextUI TxtValue;
        private System.Windows.Forms.Button BtnCopy;
    }
}
